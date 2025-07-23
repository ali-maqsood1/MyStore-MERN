import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useUserStore } from "../store/user";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useUserStore((state) => state.user);
	const logout = useUserStore((state) => state.logout);
	const navigate = useNavigate();
	const location = useLocation();

	const isLoggedIn = !!user;

	const handleLogout = () => {
		logout();
		navigate("/signup");
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{ base: "column", sm: "row" }}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					{isLoggedIn && (
						<Link to={"/create"}>
							<Button colorScheme="teal">
								<PlusSquareIcon fontSize={20} mr={2} />
								Add Product
							</Button>
						</Link>
					)}

					{isLoggedIn ? (
						<Button colorScheme="red" onClick={handleLogout}>
							Logout
						</Button>
					) : location.pathname === "/signup" ? (
						<Link to="/login">
							<Button colorScheme="blue">Login</Button>
						</Link>
					) : (
						<Link to="/signup">
							<Button colorScheme="blue">Sign Up</Button>
						</Link>
					)}

					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
