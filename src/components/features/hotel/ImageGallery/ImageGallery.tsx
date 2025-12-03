import { useState, useEffect } from "react"
import styles from "./ImageGallery.module.css"
import { HotelGalleryImage } from "../../../../types"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

type Props = {
  images: HotelGalleryImage[]
}

export default function ImageGallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0)
    }
  }, [images])
  
  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.imageContainer}>
        <img 
          src={currentImage.url} 
          alt={`Hotel view ${currentIndex + 1}`}
          className={styles.mainImg}
        />
        
        {images.length > 1 && (
          <>
            <button 
              className={styles.arrowBtn}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            
            <button 
              className={`${styles.arrowBtn} ${styles.arrowRight}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>

            <div className={styles.dots}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
