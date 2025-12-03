import { useState } from "react"
import styles from "./HotelInfo.module.css"
import { HotelDetails } from "../../../../types/hotel.types"

type Props = {
  hotel: HotelDetails
}

export default function HotelInfo({ hotel }: Props) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className={styles.box}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "description" ? styles.active : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`${styles.tab} ${activeTab === "features" ? styles.active : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${activeTab === "map" ? styles.active : ""}`}
          onClick={() => setActiveTab("map")}
        >
          Map
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "description" && (
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>About This Hotel</h3>
            <p className={styles.text}>{hotel.description}</p>
          </div>
        )}

        {activeTab === "features" && (
          <div className={styles.features}>
            <h3 className={styles.sectionTitle}>Hotel Features</h3>
            <p className={styles.text}>This hotel offers premium amenities and services for a comfortable stay.</p>
          </div>
        )}

        {activeTab === "map" && (
          <div className={styles.mapContainer}>
            <iframe
              width="100%"
              height="300"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
              style={{ border: 0, borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
