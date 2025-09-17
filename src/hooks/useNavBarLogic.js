import { useState } from "react";

export default function useNavBarLogic() {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleOpenMenuBurger() {
        setMenuOpen(true);
    }
    function handleCloseMenuBurger() {
        setMenuOpen(false);
    }
    return {
        menuOpen,
        handleOpenMenuBurger,
        handleCloseMenuBurger,
    };
}
