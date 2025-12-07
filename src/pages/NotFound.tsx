import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="section-full font-inter pt-20">
        <div className="container-premium text-center">
          <span className="text-[200px] font-bold opacity-5">404</span>
          <div className="mt-[-4rem]">
            <h1 className="heading-lg mb-4">Page not found</h1>
            <p className="body-md text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
