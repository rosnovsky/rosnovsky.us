import Footer from '@components/Footer';
import { NavBar } from '@components/NavBar';

const Containter = ({ children }) => {
  return (
    <div className="">
      <section className="relative bg-coolGray-50 overflow-hidden">
        <NavBar />
        <div className="bg-transparent">{children}</div>
        <Footer />
      </section>
    </div>
  );
};

export default Containter;
