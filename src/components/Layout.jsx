/* eslint-disable react/prop-types */

const Layout = ({ children }) => {
  return (
    <section className="font-lexend">
      <div className="lg:ml-[290px] md:ml-[290px] sm:ml-0 p-4">{children}</div>
    </section>
  );
};

export default Layout;
