import React from "react";
import {useTranslation} from "react-i18next";
import {Menu, MenuButton, MenuList, MenuItem, Button} from "@chakra-ui/react";

export const LanguageSwitcher: React.FC = () => {
    const {i18n} = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    return (
        <Menu>
            <MenuButton as={Button} size="sm" mt={4}>
                Change Language
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage("es")}>Español</MenuItem>
            </MenuList>
        </Menu>
    );
};