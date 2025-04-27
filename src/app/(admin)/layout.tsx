import { getSession } from "../../lib/auth";
import "./globals.css";
import Providers from "./provider";

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	return (
		<html lang='en'>
			<title>Admin</title>
			<meta charSet='UTF-8' />
			<meta name='description' content='clothing shop admin dashboard' />
			<body className=' text-secondary relative'>
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
