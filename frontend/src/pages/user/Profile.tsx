import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'

function ProfileContent() {
  const { user } = useAuth()
  return (
    <main className='flex-1 px-4 bg-gray-50 dark:bg-neutral-800 overflow-y-auto'>
      <div className='max-w-4xl'>
        <div className='bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold text-primary mb-4'>Personal Details</h2>
          <hr className='mb-4' />
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-primary mb-1'>Full Name</label>
              <Input type='text' defaultValue={user?.fullName || ''} />
            </div>

            <div>
              <label className='block text-sm font-medium text-primary mb-1'>Email</label>
              <input
                type='email'
                defaultValue={user?.email || ''}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
              <input
                type='tel'
                defaultValue={user?.phoneNumber || ''}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Bio</label>
              <textarea
                rows={4}
                defaultValue='Software developer passionate about creating amazing user experiences.'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='mt-6 flex gap-3'>
            <Button color='primary'>Save</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ProfilePage() {
  return <ProfileContent />
}
