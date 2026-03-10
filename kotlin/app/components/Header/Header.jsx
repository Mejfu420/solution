import { useEffect, useState } from "react";
import GlobalHeader from "@jetbrains/kotlin-web-site-ui/out/components/header";
import navData from "../../data/nav.json";

const DEFAULT_SEARCH_CONFIG = {
    searchAlgoliaId: "",
    searchApiKey: "",
};

export default function Header({ searchConfig, ...props }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <GlobalHeader
            {...props}
            hasSearch={!!searchConfig}
            searchConfig={searchConfig ?? DEFAULT_SEARCH_CONFIG}
            productWebUrl="/"
            currentTitle="Kotlin"
            navigation={navData}
        />
    );
}
