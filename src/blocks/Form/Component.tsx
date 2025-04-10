'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { CornerDownLeft } from 'lucide-react'
import { mapToTeleCRMFormat } from '@/utilities/teleCRMHelper'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
    className?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    className
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Submit to Payload CMS form submission endpoint
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            clearTimeout(loadingTimerID)
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          // If Payload submission is successful, submit to teleCRM API
          try {
            // Use the helper function to format the data for teleCRM
            const teleCRMData = mapToTeleCRMFormat(data)

            // Submit to teleCRM API through our secure middleware
            const teleCRMReq = await fetch(`${getClientSideURL()}/api/telecrm-submit`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(teleCRMData)
            })

            if (!teleCRMReq.ok) {
              // Log the error but don't show to user since the primary submission was successful
              console.error('Failed to submit to teleCRM:', await teleCRMReq.text())
            } else {
              console.log('Successfully submitted to teleCRM')
            }
          } catch (teleCRMError) {
            // Log the error but don't show to user since the primary submission was successful
            console.error('Error submitting to teleCRM:', teleCRMError)
          }

          // Continue with successful submission flow
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className={className || 'container lg:max-w-[48rem]'}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 mb-4 md:mb-6 border border-black rounded-2xl bg-white relative">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-2 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>
              <div className="flex justify-center w-full absolute -bottom-5 left-0">
                <Button form={formID} type="submit" variant="theme">
                  {submitButtonLabel} <CornerDownLeft className="ml-2" size={16} />
                </Button>
              </div>


            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
