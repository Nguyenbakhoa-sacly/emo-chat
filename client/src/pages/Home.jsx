

import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* https://c4.wallpaperflare.com/wallpaper/792/639/808/pattern-monochrome-telegram-logo-cats-hd-wallpaper-preview.jpg */}
      <div>
        Home
        <section>
          <Outlet />
        </section>
      </div>
    </>
  )
}
