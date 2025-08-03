import {
  VStack,
  Input,
  Button,
  Heading,
  useToast,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useUserStore((state) => state.login);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await login(form);
    if (res.success) {
      toast({ title: "Login successful", status: "success" });
      navigate("/");
    } else {
      toast({ title: "Login failed", description: res.message, status: "error" });
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.100", "gray.900");

  return (
    <>
    <Flex justify="center" align="center" minH="90vh" bg={pageBg}>
      <Box
        bg={bgColor}
        p={10}
        rounded="md"
        boxShadow="lg"
        width={{ base: "90%", sm: "400px" }}
      >
        <VStack spacing={5}>
          <Heading size="lg">Login</Heading>
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button colorScheme="blue" width="full" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Flex>
      <Box textAlign="center" mt={4} mb={10} color="gray.500">
        Made by Ali Maqsood &copy; 2025
      </Box>
    </>
  );
};

export default LoginPage;
