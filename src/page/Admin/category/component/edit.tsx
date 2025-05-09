import React from "react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { getCateSlice, updateCatgorySlice } from "../../../../redux/slice/category/thunk/category"
import { toast } from "react-toastify"
import { getCategory } from "../../../../sevices/category"
import { useAppDispatch } from "../../../../hook"
import MVImage from "../../../../components/MV/Image"
import MVUpload from "../../../../components/MV/Upload"
import MVInput from "../../../../components/MV/Input"
import { MySelectWrapper } from "../../../../components/Form/component/select"
import { ApiContext } from "../../../../context/api"
import { handleImage } from "../../../../lib/handleImage"
import { ISMOVIE, RELEASES } from "../../../../constant/categoyy"
import { DatePicker, TreeSelect, Card, Row, Col, Divider, Typography, Space, Form, Button } from "antd"
import { useSWRWithAxios } from "../../../../hook/Swr"
import { urlSwr } from "../../../../function"

const { SHOW_PARENT } = TreeSelect
const { Title, Text } = Typography
declare var Promise: any

const EditCategory = () => {
  const dispatch = useAppDispatch()
  const [selectCategory, setSelectCategory] = useState([])
  const { weeks } = useContext(ApiContext)
  const [state, setState]: any = useState({})
  const { reset, handleSubmit, control } = useForm()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getCateSlice(id))
        const { data }: any = await getCategory(id)
        reset({
          ...data,
          week: data.week._id,
        })
        setState(data)
      } catch (error) {
        toast.error("Failed to load category data")
      }
    }

    fetchData()
  }, [dispatch, id, reset])

  const { data: categorySelect } = useSWRWithAxios(urlSwr + "/bigcategory/content")

  const weeekOptions =
    weeks &&
    weeks?.map((item: any) => ({
      label: item.name,
      value: item._id,
    }))

  const UpcomingReleasesOptions = RELEASES?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }))

  const treeDataCateogys =
    categorySelect &&
    categorySelect?.map((item: any) => ({
      title: item.name,
      value: item._id,
      key: item._id,
    }))

  const isMovieOptions = ISMOVIE?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }))

  const onChangeTreeCategory = (newValue: string[]) => {
    setSelectCategory(newValue)
  }

  const tProps = {
    treeData: treeDataCateogys,
    value: selectCategory,
    onChange: onChangeTreeCategory,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select categories",
    style: {
      width: "100%",
    },
  }

  const onsubmit = async (data: any) => {
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append("_id", data._id)
      formdata.append("name", data.name)
      formdata.append("slug", data.slug)
      formdata.append("des", data.des)
      formdata.append("week", data.week)
      formdata.append("type", data.type)
      formdata.append("file", data.file)
      formdata.append("up", data.up)
      formdata.append("time", data.time)
      formdata.append("isActive", data.isActive)
      formdata.append("year", data.year)
      formdata.append("anotherName", data.anotherName)
      formdata.append("sumSeri", data.sumSeri)
      formdata.append("hour", data.hour)
      formdata.append("lang", data.lang)
      formdata.append("season", data.season)
      formdata.append("quality", data.quality)
      formdata.append("episode_many_title", data.episode_many_title)
      formdata.append("upcomingReleases", data.upcomingReleases)
      formdata.append("isMovie", data.isMovie)

      const res = await dispatch(updateCatgorySlice(formdata))
      if (res.payload) {
        toast.success("Category updated successfully")
      } else {
        toast.error("Failed to update category")
      }
    } catch (error) {
      toast.error("An error occurred while updating")
    } finally {
      setLoading(false)
    }
  }

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <Card title={<Title level={4}>Edit Category</Title>} bordered={false} className="shadow-md">
      <form onSubmit={handleSubmit(onsubmit)}>
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={16}>
            <Card className="mb-6" bordered={false}>
              <Title level={5}>Basic Information</Title>
              <Divider className="my-3" />

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <MVInput
                    name="name"
                    label="Category Name"
                    control={control}
                    rules={{ required: "Category name is required" }}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <MVInput name="anotherName" label="Alternative Name" control={control} />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <MVInput name="slug" label="Slug" control={control} rules={{ required: "Slug is required" }} />
                </Col>
                <Col xs={24} md={12}>
                  <MVInput name="type" label="Type" control={control} />
                </Col>
              </Row>

              <MVInput name="des" label="Description" control={control} />
            </Card>

            <Card className="mb-6" bordered={false}>
              <Title level={5}>Media Details</Title>
              <Divider className="my-3" />

              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <MVInput name="time" label="Duration" control={control} />
                </Col>
                <Col xs={24} md={8}>
                  <MVInput name="year" label="Year" control={control} type="number" />
                </Col>
                <Col xs={24} md={8}>
                  <MVInput name="up" label="Set" control={control} />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <MVInput name="sumSeri" label="Total Episodes" control={control} type="number" />
                </Col>
                <Col xs={24} md={8}>
                  <MVInput name="hour" label="Hour" control={control} />
                </Col>
                <Col xs={24} md={8}>
                  <MVInput name="season" label="Season" control={control} type="number" />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <MVInput name="lang" label="Language" control={control} />
                </Col>
                <Col xs={24} md={12}>
                  <MVInput name="quality" label="Quality" control={control} />
                </Col>
              </Row>

              <MVInput name="episode_many_title" label="Episode Many Title" control={control} />
            </Card>

            <Card className="mb-6" bordered={false}>
              <Title level={5}>Classification</Title>
              <Divider className="my-3" />

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label={<Text strong>Week</Text>}>
                    <MySelectWrapper
                      name="week"
                      label=""
                      control={control}
                      placeholder="Select week"
                      options={weeekOptions}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<Text strong>Upcoming Releases</Text>}>
                    <MySelectWrapper
                      name="upcomingReleases"
                      label=""
                      control={control}
                      placeholder="Select release type"
                      options={UpcomingReleasesOptions}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label={<Text strong>Is Movie</Text>}>
                    <MySelectWrapper
                      name="isMovie"
                      label=""
                      control={control}
                      placeholder="Is this a movie?"
                      options={isMovieOptions}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={<Text strong>Active Status</Text>}>
                    <MySelectWrapper
                      name="isActive"
                      label=""
                      control={control}
                      placeholder="Select status"
                      options={[
                        { label: "Active", value: "true" },
                        { label: "Inactive", value: "false" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<Text strong>Release Date</Text>}>
                <DatePicker className="w-full" onChange={onChangeDate} />
              </Form.Item>

              <Form.Item label={<Text strong>Categories</Text>}>
                <TreeSelect {...tProps} className="w-full" />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card bordered={false}>
              <Title level={5}>Media</Title>
              <Divider className="my-3" />

              {state && state.linkImg && (
                <div className="mb-4 text-center">
                  <MVImage
                    style={{ maxWidth: "100%", margin: "0 auto" }}
                    className="rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                    src={handleImage(200, state.linkImg)}
                    alt={state.name || "Category image"}
                  />
                  <Text type="secondary" className="block mt-2">
                    Current image
                  </Text>
                </div>
              )}

              <MVInput name="linkImg" label="Image URL" control={control} />

              <div className="mt-4">
                <Text strong>Upload New Image</Text>
                <MVUpload name="file" label="" control={control} />
              </div>
            </Card>

            <div className="mt-6 text-right">
              <Space>
                <Button type="default" size="large">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                  Save Changes
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </form>
    </Card>
  )
}

export default EditCategory
