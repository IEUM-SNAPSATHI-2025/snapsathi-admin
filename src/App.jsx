import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./features/auth/pages/SignInPage";
import { ReservationPage } from "./features/reservations";
import ReservationInquiryDetailPage from "./features/reservations/pages/ReservationInquiryDetailPage";
import ReservationInquiryPage from "./features/reservations/pages/ReservationInquiryPage";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ReservationPage />} />
          <Route path="/inquiry" element={<ReservationInquiryPage />} />
          <Route
            path="inquiry/:id"
            element={<ReservationInquiryDetailPage />}
          />
        </Route>
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
