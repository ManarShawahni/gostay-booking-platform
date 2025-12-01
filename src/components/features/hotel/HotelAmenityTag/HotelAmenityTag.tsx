import styles from "./HotelAmenityTag.module.css"

interface Props {
  name: string
}

export default function HotelAmenityTag({ name }: Props) {
  return <span className={styles.tag}>{name}</span>
}
