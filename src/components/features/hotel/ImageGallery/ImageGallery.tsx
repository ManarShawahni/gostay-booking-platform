import styles from "./ImageGallery.module.css"
import { HotelGalleryImage } from "../../../../types"

type Props = {
  images: HotelGalleryImage[]
}

export default function ImageGallery({ images }: Props) {
  return (
    <div className={styles.gallery}>
      {images.slice(0, 4).map((img) => (
        <img key={img.id} src={img.url} className={styles.img} />
      ))}
    </div>
  )
}
