import { useTheme } from "@/contexts/ThemeContext"
import { Switch } from "@basic-monorepo/ui/switch"
import { Moon, Sun } from "lucide-react"
import Button from "../ui/Button"

interface IPropsToggleTheme {
    type?: 'compact' | 'default'
}
export function ToggleTheme({ type = 'default' }: IPropsToggleTheme) {
    const { theme, toggleTheme } = useTheme()

    if (type === 'compact') {
        return (
            <Button
                icon
                rounded
                className='h-8 w-8'
                variant='ghost'
                color='secondary'
                onClick={toggleTheme}
            >
                {theme === 'dark' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
            </Button>
        )
    }

    return (
        <div role="button" className='flex items-center gap-4 cursor-pointer text-sm' onClick={toggleTheme}>
          <span>Dark mode</span>
          <Switch checked={theme === 'dark'} className="cursor-pointer" />
        </div>
    )
}