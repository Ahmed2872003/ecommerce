import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/notfoundpage");
  }, []);
  return null;
}

export default function CustomSwitch(props) {
  const { children } = props;

  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}
