import styles from "./list-comments.module.css";
import logoDonkey from "./../../assets/logo-donkey.jpg";


export default function ListComments() {

    return (
        <>
            <article className={styles.container_list}>

                {/* // todo: faire l'affichage dynamique avec un .map */}
                <p className={styles.comments}>J'adore ta photo !!!! Comment as-tu fait pour générer des images?</p>

                <div className={styles.cards_head}>
                    <div className={styles.avatar}><img src={logoDonkey} alt="logo-user" /></div>
                </div>
            </article>

            <article className={styles.container_list}>

                {/* // todo: faire l'affichage dynamique avec un .map */}
                <p className={styles.comments}>Voici un petit commentaire pour voir ce que cela fait lorsqu'on en a plein !!!! Et il est très long Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis tempora praesentium explicabo, sed, eos labore, accusantium optio et eius nulla tempore!</p>

                <div className={styles.cards_head}>
                    <div className={styles.avatar}><img src={logoDonkey} alt="logo-user" /></div>
                </div>
            </article>
        </>
    )
}