import { Container } from "@mui/material";
import { Hero } from "../component/Hero";
import { Benefits } from "../component/Benefits";
import { Footer } from "../component/Footer";

export const LandingPage = () => {
    return (
        <Container maxWidth="md">
            <Hero />
            <Benefits />
            <Footer />
        </Container>
    );
};
