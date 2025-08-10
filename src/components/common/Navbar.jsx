import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { BsChevronDown } from "react-icons/bs";
import { logout } from "../../services/operations/authAPI";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const inDashboard = location.pathname.startsWith("/dashboard");
  const inCatalogCourseFlow =
    location.pathname.startsWith("/catalog/") ||
    location.pathname.startsWith("/course/") ||
    location.pathname.startsWith("/checkout");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  // Regular user dashboard links
  const dashboardLinks = [
    { title: "My Profile", path: "/dashboard/my-profile" },
    { title: "Enrolled Courses", path: "/dashboard/enrolled-courses" },
    { title: "Purchase History", path: "/dashboard/purchase-history" },
    { title: "Cart", path: "/dashboard/cart" },
    { title: "Settings", path: "/dashboard/settings" },
    {
      title: "Logout",
      action: () => {
        setShowLogoutModal(true);
        setMenuOpen(false);
      },
    },
  ];

  // Instructor specific dashboard links
  const instructorDashboardLinks = [
    { title: "Dashboard", path: "/dashboard/instructor" }, 
    { title: "My Courses", path: "/dashboard/my-courses" }, 
    { title: "Add Course", path: "/dashboard/add-course" }, 
    { title: "Settings", path: "/dashboard/settings" },
    {
      title: "Logout",
      action: () => {
        setShowLogoutModal(true);
        setMenuOpen(false);
      },
    },
  ];

  return (
    <>
      <div
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
          </Link>

          {/* Navigation links - Desktop */}
          {/* {!inDashboard && inDashboard &&( */}
            <nav className="hidden md:block">
              <ul className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          {/* )} */}

          {/* Login / Signup / Dashboard (Desktop) */}
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {token !== null && <ProfileDropdown />}
          </div>

          {/* Mobile Menu Button */}
          <button className="mr-4 md:hidden" onClick={() => setMenuOpen(true)}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm md:hidden">
            <div className="relative w-[90%] max-w-sm rounded-lg bg-richblack-800 text-white p-6 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-4 text-2xl text-richblack-25"
              >
                ✕
              </button>

              <nav className="flex flex-col gap-4 text-lg">
                {inDashboard && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/");
                        setMenuOpen(false);
                      }}
                      className="text-yellow-25 font-semibold"
                    >
                      ← Back to Home
                    </button>
                    {instructorDashboardLinks.map((item, idx) =>
                      item.action ? (
                        <button key={idx} onClick={item.action}>
                          {item.title}
                        </button>
                      ) : (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </>
                ) : inDashboard ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/");
                        setMenuOpen(false);
                      }}
                      className="text-yellow-25 font-semibold"
                    >
                      ← Back to Home
                    </button>
                    {dashboardLinks.map((item, idx) =>
                      item.action ? (
                        <button key={idx} onClick={item.action}>
                          {item.title}
                        </button>
                      ) : (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </>
                ) : inCatalogCourseFlow ? (
                  <>
                    <button
                      onClick={() => {
                        navigate(-1);
                        setMenuOpen(false);
                      }}
                      className="text-yellow-25 font-semibold"
                    >
                      ← Back
                    </button>
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </>
                ) : (
                  <>
                    {token === null ? (
                      <>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                          Login
                        </Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)}>
                          Signup
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/dashboard/my-profile"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>
                      About
                    </Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>
                      Contact
                    </Link>
                    {/* Mobile Catalog */}
                    <div>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                      >
                        <p>Catalog</p>
                        <IoIosArrowDropdownCircle
                          className={`text-xl transition-transform ${
                            mobileCatalogOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                      {mobileCatalogOpen && subLinks.length > 0 ? (
                        <div className="ml-4 mt-2 flex flex-col gap-1 text-sm">
                          {subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              onClick={() => {
                                setMenuOpen(false);
                                setMobileCatalogOpen(false);
                              }}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      ) : mobileCatalogOpen && subLinks.length === 0 ? (
                        <p className="ml-4 mt-2 text-sm text-red-400">
                          No Categories Found
                        </p>
                      ) : null}
                    </div>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-richblack-800 p-6 rounded-lg text-white space-y-6 w-[90%] max-w-sm">
            <p className="text-lg font-bold">Are you sure?</p>
            <p className="text-sm text-richblack-200 font-bold">
              You will be logged out of your account.
            </p>
            <div className="flex gap-4 justify-end border-rounded">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-richblack-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(logout(navigate));
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 rounded bg-yellow-50 text-richblack-900 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;


