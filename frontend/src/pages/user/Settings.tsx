import Button from '@/components/ui/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@basic/components/shadcn/ui/select"
import { useState } from 'react'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
]

function SettingsContent() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  return (
    <main className='flex-1 px-4 bg-gray-50 dark:bg-neutral-800 overflow-y-auto'>
      <div className='max-w-4xl'>
        <div className='bg-white dark:bg-neutral-900 rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold text-primary mb-4'>Settings</h2>
          <hr className='mb-4' />
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-primary mb-1'>Language</label>
              <Select
                defaultValue={selectedLanguage}
                onValueChange={(value: string) => setSelectedLanguage(value)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Language' />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default function SettingsPage() {
  return <SettingsContent />
}
