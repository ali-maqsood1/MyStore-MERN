import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
	Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const toast = useToast();
	const { createProduct } = useProductStore();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleAddProduct = async () => {
		setIsLoading(true); // Start loading here

		const { success, message } = await createProduct(newProduct);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			isClosable: true,
		});

		setNewProduct({ name: "", price: "", image: "" });

		if (success) {
			setTimeout(() => {
				navigate("/");
			}, 1500); // short delay to show loading screen
		} else {
			setIsLoading(false); // Only stop loading if failed
		}
	};

	// ✅ If loading, show spinner instead of form
	if (isLoading) {
		return (
			<VStack justify="center" align="center" h="100vh">
				<Spinner size="xl" />
				<Heading mt={4}>Adding Product...</Heading>
			</VStack>
		);
	}

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme="blue" onClick={handleAddProduct} w="full">
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreatePage;
