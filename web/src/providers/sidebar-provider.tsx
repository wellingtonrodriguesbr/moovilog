"use client";

import { usePathname } from "next/navigation";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useWindowSize } from "react-use";

type SidebarContextData = {
	isOpen: boolean;
	handleOpenAndCloseSidebar: () => void;
};

const SidebarContext = createContext({} as SidebarContextData);

export default function SidebarProvider({ children }: { children: ReactNode }) {
	const path = usePathname();

	const { width } = useWindowSize();
	const [isOpen, setIsOpen] = useState(false);

	function handleOpenAndCloseSidebar() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		if (width >= 720 && !path?.includes("/cadastro")) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [path, width]);

	return (
		<SidebarContext.Provider value={{ isOpen, handleOpenAndCloseSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useOpenCloseSidebar() {
	const { isOpen, handleOpenAndCloseSidebar } = useContext(SidebarContext);
	return { isOpen, handleOpenAndCloseSidebar };
}
