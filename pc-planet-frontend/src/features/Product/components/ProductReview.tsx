import React, { useState } from 'react';
import { AppButton } from '../../../components';
import { Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';
import NotFound from '../../../components/patterns/NotFound';

const ProductReview = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 0,
  });

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(e.target.value) });
  };

  const handleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => null;

  const renderRatings = () => {
    const ratings = [];
    for (let i = 1; i <= 5; i++) {
      ratings.push(
        <FormCheck
          key={i}
          inline
          type='radio'
          name='rating'
          value={i}
          onChange={handleRatingChange}
        />,
      );
    }
    return ratings;
  };

  return (
    <section className='bg-white shadow-sm p-4 rounded'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex flex-column'>
          <span className='fs-5 fw-bold'>Reviews</span>
          <span>Customers Review</span>
        </div>
        <div>
          <AppButton onClick={handleReviewForm} className={'custom-outline-btn fw-bold'}>
            Write a Review
          </AppButton>
        </div>
      </div>
      <hr />

      {showReviewForm && (
        <div className='d-flex flex-column align-items-center'>
          <h5>Write a Review</h5>
          <Form className='review-form'>
            <FormGroup>
              <FormControl
                type='text'
                name='name'
                placeholder='Enter Your Name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormControl
                as='textarea'
                name='comment'
                placeholder='Write Your Comment'
                rows={4}
                value={formData.comment}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <h6>Rating</h6>
              <div>
                <span className='me-3'>Bad</span>
                {renderRatings()}
                <span>Good</span>
              </div>
            </FormGroup>
            <div className='d-flex justify-content-center mt-3'>
              <AppButton className={'custom-fill-btn'} onClick={handleSubmit}>
                Submit
              </AppButton>
            </div>
          </Form>
        </div>
      )}

      <div>
        <NotFound
          minHeight='min-height-20vh'
          primaryText='This product has no reviews yet. Be the first one to write a review.'
          secondaryText={''}
        />
      </div>
    </section>
  );
};

export default ProductReview;
