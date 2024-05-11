import Link from 'next/link'
import Image from 'next/image'

export default function HeaderLogo() {
    return (
        <Link href={'/'}>
            <div className='items-center hidden lg:flex justify-center'>
                <Image src={'logo.svg'} width={36} height={36} alt='logo' className='-mb-3'></Image>
                <p className='text-2xl font-semibold text-white ml-2'>SpendFlix</p>
            </div>
        </Link>
    )
}