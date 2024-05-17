import Link from 'next/link'
import Image from 'next/image'

export default function HeaderLogo() {
    return (
        <Link href={'/'}>
            <div className='items-center hidden lg:flex justify-center'>
                <Image src={'logo.svg'} width={48} height={48} alt='logo'></Image>
                <p className='text-2xl font-semibold text-white ml-2'>FinTracker</p>
            </div>
        </Link>
    )
}