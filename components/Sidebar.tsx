import Card from './Card'
// import Image from 'next/image'
// import logo from '@/assets/images/logo.png'
import SidebarLink, { SidebarLinkType } from './SidebarLink'

const links = [
  { label: 'Dashboard', icon: 'Grid', link: '/dashboard' },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
] as SidebarLinkType[]

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        {/*<Image src={logo} alt="Able logo" priority className="w-14" />*/}
      </div>
      {links.map((link, index) => (
        <SidebarLink key={index} link={link} />
      ))}
    </Card>
  )
}

export default Sidebar
