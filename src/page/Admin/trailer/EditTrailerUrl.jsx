import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTrailerUrl } from '../../../api/trailer';
import { toast } from 'react-toastify';
import { editTrailerSlice } from '../../../redux/slice/postSlice';
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const editTrailerUrl = () => {
  const { handleSubmit, register, reset } = useForm();
  const { id } = useParams();
  const dispath = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const { data } = await getTrailerUrl(id);
      reset(data);
    }
    getData();
  }, []);
  const navigete = useNavigate();
  const onsubmit = (data) => {
    if (data) {
      toast.success('edit successfully');
      dispath(editTrailerSlice(data));
      // navigete('/admin/trailing');
    } else {
      toast.error('edit failed');
    }
  }
  return (
    <Divstyled>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Divstyled className="mb-3">
          <label className="form-label">Product name</label>
          <InputStyled type="text" {...register('url')} className="form-control" />
        </Divstyled>
        <BtnStyled className="btn btn-primary">Submit</BtnStyled>
      </form>
    </Divstyled>
  )
}

export default editTrailerUrl
