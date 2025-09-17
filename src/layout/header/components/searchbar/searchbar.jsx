import styles from "./searchbar.module.css";

export default function Searchbar() {


    return (
        <div className={styles.search_container}>
            <form action="#" className={styles.searchBar}>
                <input type="text" id="SearchBar" className={styles.searchBar_input} placeholder="Search..." />
            </form>
        </div>
    )
}