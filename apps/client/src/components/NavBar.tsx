import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { useState } from "react";

import { BsPersonBoundingBox } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

import routes from "~/constants/routes";
import TokenService from "~/services/TokenService";

const NavBarItems = [
  {
    name: "Home",
    path: routes.HOME,
  },
  {
    name: "Blogs",
    path: `/${routes.BLOGS}`,
  },
  {
    name: "Friends",
    path: `/${routes.USERS}/${routes.FRIENDS}`,
  },
  {
    name: "Requests",
    path: `/${routes.USERS}/requests`,
  },
];
const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    TokenService.removeTokens();
    handleClose();
    navigate(`/${routes.LOGIN}`, { replace: true });
  };

  const handleProfileClick = () => {
    handleClose();
    navigate(`/${routes.PROFILE}`, { replace: true });
  };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={2}
      sx={{ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box sx={{ paddingLeft: 3 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            FaceCopy
          </Typography>
        </Box>
        <div className="flex items-center gap-5 mr-5">
          <div className="flex gap-6 items-center">
            {NavBarItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  replace
                  className={classNames("text-white hover:text-gray-300", {
                    underline: item.path === pathname,
                  })}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <IconButton size="medium" onClick={handleMenu} color="inherit">
            <IoPersonCircle size={24} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleProfileClick}
              sx={{ display: "flex", gap: 1 }}
            >
              <BsPersonBoundingBox size={14} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ display: "flex", gap: 1 }}>
              <CiLogout size={14} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
