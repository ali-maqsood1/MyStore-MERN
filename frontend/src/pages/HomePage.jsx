import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import {
  SimpleGrid,
  VStack,
  Text,
  Box,
  Heading,
  Icon,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSadTear } from "react-icons/fa";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  if (loading)
    return (
      <VStack py={12}>
        <Spinner size="xl" thickness="4px" color="blue.500" />
        <Text>Loading products...</Text>
      </VStack>
    );

  if (error)
    return (
      <VStack py={12}>
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </VStack>
    );

  if (!Array.isArray(products) || products.length === 0)
    return (
      <VStack py={20} spacing={4}>
        <Icon as={FaSadTear} boxSize={12} color="gray.500" />
        <Heading size="md" color="gray.600">
          No products found
        </Heading>
        <Text color="gray.500">Start by creating a new product!</Text>
      </VStack>
    );

  return (
    <Box px={6} py={8}>
      <Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
			</Text>

      <SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>
	    	<Box textAlign="center" mt={12} color="gray.500">
	          Made by Ali Maqsood &copy; 2025
	        </Box>
    </Box>
  );
};

export default HomePage;
