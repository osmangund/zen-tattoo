import { motion } from "framer-motion"
import { height } from "./anim"
import Body from "./body"
import { useState } from "react"
import NavImage from "./image"

const links = [
  { title: "Home", href: "/#home", src: "home" },
  { title: "Contact", href: "/#contact", src: "contact" },
]

export default function Nav({ setIsActive }) {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  })

  return (
    <motion.nav
      className="overflow-hidden"
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="mb-20 flex">
        <div>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
          {/* <Footer /> */}
        </div>
        <NavImage
          src={links[selectedLink.index].src}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.nav>
  )
}
