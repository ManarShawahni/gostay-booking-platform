import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./BookingForm.module.css";
import { Input } from "../../../common/Input/Input";


interface BookingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  paymentMethod: string;
  specialRequests: string;
}

interface Props {
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  onSubmit: (values: BookingFormValues) => void;
}

const BookingSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  paymentMethod: Yup.string().required("Required"),
});

export const BookingForm = ({ onSubmit }: Props) => {
  return (
     <Formik<BookingFormValues>
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        paymentMethod: "",
        specialRequests: "",
      }}
      validationSchema={BookingSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          <h3 className={styles.title}>Guest Information</h3>

          {/* FIRST NAME */}
          <label className={styles.label}>First Name</label>
          <Input
            value={values.firstName}
            placeholder="First Name"
            onChange={(e) => setFieldValue("firstName", e.target.value)}
          />
          <ErrorMessage name="firstName" component="div" className={styles.error} />

          {/* LAST NAME */}
          <label className={styles.label}>Last Name</label>
          <Input
            value={values.lastName}
            placeholder="Last Name"
            onChange={(e) => setFieldValue("lastName", e.target.value)}
          />
          <ErrorMessage name="lastName" component="div" className={styles.error} />

          {/* EMAIL */}
          <label className={styles.label}>Email</label>
          <Input
            value={values.email}
            placeholder="Email"
            type="email"
            onChange={(e) => setFieldValue("email", e.target.value)}
          />
          <ErrorMessage name="email" component="div" className={styles.error} />

          {/* PHONE */}
          <label className={styles.label}>Phone Number</label>
          <Input
            value={values.phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
          />
          <ErrorMessage name="phoneNumber" component="div" className={styles.error} />

          {/* PAYMENT METHOD */}
          <label className={styles.label}>Payment Method</label>

          <div className={styles.radioGroup}>
            <label className={styles.radio}>
              <Field type="radio" name="paymentMethod" value="Credit Card" />
              Credit Card
            </label>

            <label className={styles.radio}>
              <Field type="radio" name="paymentMethod" value="PayPal" />
              PayPal
            </label>

            <label className={styles.radio}>
              <Field type="radio" name="paymentMethod" value="Cash at Hotel" />
              Cash at Hotel
            </label>
          </div>

          <ErrorMessage name="paymentMethod" component="div" className={styles.error} />

          {/* SPECIAL REQUESTS */}
          <label className={styles.label}>Special Requests</label>
          <Field
            as="textarea"
            name="specialRequests"
            placeholder="Any notes?"
            className={styles.textarea}
          />

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Complete Checkout"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
