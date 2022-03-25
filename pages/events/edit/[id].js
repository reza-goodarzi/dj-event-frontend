import { useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { API_URL } from "../../../config";
import styles from "../../../styles/Form.module.css";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ImageUpload from "../../../components/ImageUpload";

function EditEventPage({ evt }) {
  console.log(evt);
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [newImage, setNewImage] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyValue = Object.values(values).some((element) => element === "");

    if (hasEmptyValue) {
      toast("Please fill all fields", { type: "error" });
      return;
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: { ...values, image: newImage } }),
    });

    if (!res.ok) {
      toast.error("Something Went Wrong");
      return;
    }

    const { data } = await res.json();
    router.push(`/events/${data.slug}`);
    console.log(data);
    toast.success("Event Updated");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (image) => {
    setImagePreview(image.formats.thumbnail.url);
    setNewImage(image);
    setShowModal(false);
  };

  return (
    <Layout title="Add new event">
      <Link href="/events">Go Back</Link>

      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="performers">Event Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="venue">Event Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="address">Event Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="time">Event Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="description">Event Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <h2>Event Image</h2>
            {imagePreview ? (
              <Image src={imagePreview} height={100} width={170} alt={evt.name} />
            ) : (
              <div>
                <p>No image uploaded</p>
              </div>
            )}

            <div>
              <button className="btn-secondary btn-icon" onClick={() => setShowModal(true)}>
                <FaImage /> Set Image
              </button>
            </div>
          </div>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtID={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export default EditEventPage;

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}?populate=image`);
  const { data: evt } = await res.json();

  return {
    props: {
      evt,
    },
  };
}
