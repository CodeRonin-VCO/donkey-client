import { useTranslation } from "react-i18next";
import styles from "./searchbar.module.css";

export default function Searchbar({ searchTerm, setSearchTerm }) {
    // trad
    const { t } = useTranslation();

    return (
        <div className={styles.search_container}>
            <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    id="SearchBar"
                    className={styles.searchBar_input}
                    placeholder={t("connections.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </form>
        </div>
    )
}