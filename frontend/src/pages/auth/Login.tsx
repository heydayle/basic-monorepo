import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ErrorMessage from '../../components/common/ErrorMessage'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const { authentication } = useAuth()
  const authSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })

  type AuthFormData = z.infer<typeof authSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true)
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await authentication()
    setLoading(false)
  }

  return (
    <div className='auth-container flex-center full-height min-h-54 bg-light border p-4 rounded-sm'>
      <div className='auth-card max-width-xs full-width spacing-lg'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='auth-form w-full flex flex-col gap-2 spacing-md p-4 rounded-lg'
        >
          <div>
            <Input
              placeholder='Email'
              autoComplete='username email'
              {...register('email')}
              isError={!!errors.email}
            />
            <ErrorMessage message={errors?.email?.message} />
          </div>
          <div className='mt-1'>
            <Input
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              {...register('password')}
              isError={!!errors.password}
            />
            <ErrorMessage message={errors?.password?.message} />
          </div>
          <Button
            disabled={loading}
            variant='default'
            type='submit'
            className='mt-4 flex justify-center items-center group'
          >
            <span> {'Login'} </span>
            {loading ? (
              <LoaderCircle className='w-4 h-4 ml-2 animate animate-spin' />
            ) : (
              <ArrowRight className='relative left-0 ml-2 h-4 w-4 group-hover:left-2 transition-all duration-200' />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
