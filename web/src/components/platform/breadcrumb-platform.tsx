"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES_MAP } from "@/utils/mocks/routes-mapping";

export function BreadcrumbPlatform() {
	const path = usePathname();
	const paths = path.split("/").filter(Boolean);

	const showBreadCrumbHome =
		!paths.includes("inicio") && !path.includes("cadastro");

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{showBreadCrumbHome && (
					<BreadcrumbItem className="ml-1">
						<BreadcrumbLink
							data-disabled={path.includes("/cadastro/empresa")}
							className="data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
							asChild
						>
							<Link href="/inicio">Início</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
				)}

				{paths.map((segment, index) => {
					const accumulatedPath = `/${paths.slice(0, index + 1).join("/")}`;
					const isLast = index === paths.length - 1;

					return (
						<React.Fragment key={accumulatedPath}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>
										{ROUTES_MAP[accumulatedPath] || segment}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink
										data-disabled={path.includes(
											"/cadastro/empresa"
										)}
										className="data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
										asChild
									>
										<Link href={accumulatedPath}>
											{ROUTES_MAP[accumulatedPath] ||
												segment}
										</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
