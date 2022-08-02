import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Close, FavoriteOutlined, Search } from "@material-ui/icons";
import { useState } from "react";
import Register from "../../features/Auth/components/Register";
function Header() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className=' flex justify-around items-center bg-[#000] h-[64px] text-white'>
      <div className='bg-black'>
        <img
          className='w-[100px] h-[50px]'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsn_zqBtXyWg1mFSf-xOVCSAdcNTEhIHdbAjaBzuUL8lHQIhcobkJ3M0cPkLYBhZ0Evhg&usqp=CAU'
        />
      </div>
      <div className='bg-[black] px-6 py-1 rounded-2xl border'>
        <input
          className='bg-black outline-none'
          type='text'
          placeholder='Tìm kiếm'
        ></input>
        <Search />
      </div>
      <div className='border-2 border-rose-600 rounded-2xl px-4 py-1'>
        <FavoriteOutlined />
        <span className='mx-2'>Phim yêu thích</span>
      </div>
      <button
        className='border-2 border-rose-600 rounded-2xl px-4 py-1'
        onClick={handleClickOpen}
      >
        Sign In
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <IconButton>
          <Close onClick={handleClose} />
        </IconButton>
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
