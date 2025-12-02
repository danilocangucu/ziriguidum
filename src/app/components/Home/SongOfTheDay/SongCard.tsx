import { songs } from "@/app/utils/newsletterUtils";
import Image from "next/image";
import Link from "next/link";
import styles from "./songcard.module.css";
import React from "react";

const song = songs[1];

function Song() {
  return (
    <>
      <section className={styles["song-card"]}>
        <article className={styles["song-card-details"]}>
          <Image
            className={`${styles["song-card-image"]} ${styles["listener-card-transform"]}`}
            src={`/artists/${song.image}`}
            alt={song.alt}
            width={150}
            height={150}
          />

          <div className={styles["song-card-text"]}>
            <header>
              <p className="margin-top-0 margin-bottom-0">
                <strong>{song.title}</strong> by {song.artist}
              </p>
            </header>

            <section>
              <blockquote className={styles["blockquote"]}>
                <cite>
                  {song.quote.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </cite>{" "}
              </blockquote>
            </section>
          </div>
        </article>

        <section>
          <p>{song.description}</p>
        </section>

        <footer className={styles["song-card-footer"]}>
          <p className="margin-bottom-0 margin-top-3xs">
            Listen on <Link href={song.url.spotify}>Spotify</Link> or on {" "}
            <Link href={song.url.youtube}>YouTube</Link>
          </p>
        </footer>
      </section>
    </>
  );
}

export default Song;
