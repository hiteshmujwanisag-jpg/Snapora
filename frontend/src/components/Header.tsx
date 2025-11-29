import Image from 'next/image';
import HomeIcon from '../assets/icons/HomeIcon.svg'

const Header = ({ notificationCount }: { notificationCount: number }) => {




   return ( 
  <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={require('../assets/icon.png')} className='h-7 w-7 rounded-sm' alt='homeicon' />
        
        <span className="text-xl font-bold text-foreground">Snapora</span>
      </div>
      <button className="relative p-2 rounded-lg hover:bg-muted transition-smooth">
       {/* <Image src={HomeIcon} alt='homeicon' /> */}
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        )}
      </button>
    </div>
  </header>)
};

export default Header