import { useForm, Controller } from "react-hook-form";
import React, { memo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Card,
  Row,
  Col,
  Space,
  Avatar
} from "antd";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const AuthForm = memo(
  ({
    onSubmit,
    formTitle,
    formDescription,
    submitButtonText,
    formIntro,
    formHeader,
    checkedAccount,
    handleMessage,
    redirect,
    array,
    schemaPage,
  }: any) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schemaPage),
    });

    return (
      <div className="min-h-screen flex">
        <Row
          gutter={0}
          className="w-full max-w-full h-screen"
          align="stretch"
        >
          {/* Left side - Background Image (hidden on mobile) */}
          <Col xs={0} lg={14}>
            <div
              className="relative h-screen bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/img/e21f24d3-9989-4c8c-b8a4-d7d11caa8ec6a.jpg)'
              }}
            >
              {/* Main blur to soft blue gradient overlay */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(
                  to right, transparent 0%, 
                  transparent 30%, 
                  rgb(240 248 255 / 0%) 50%,
                   rgb(240 248 255 / 0%) 70%, 
                   rgb(240 248 255 / 0%) 85%, 
                   rgb(240 248 255 / 0%) 95%, rgb(240 248 255 / 31%) 100%)`
                }}
              />

              {/* Progressive blur effect with soft blue */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: `linear-gradient(
                    to right, 
                    transparent 0%, 
                    transparent 40%,
                    rgba(240, 248, 255, 0) 60%,
                    rgba(240, 248, 255, 0.3) 80%,
                    rgb(240, 248, 255) 100%
                  )`,
                  backdropFilter: 'blur(0px)',
                  WebkitBackdropFilter: 'blur(0px)'
                }}
              />

              {/* Content overlay */}
              <div className="absolute bottom-16 left-16 z-20 text-white text-left">
                <Title
                  level={1}
                  className="text-white text-5xl mb-4 font-bold"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    color: 'white'
                  }}
                >
                  {formHeader}
                </Title>
                <Text
                  className="text-white text-lg font-medium"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    color: 'rgba(255,255,255,0.9)'
                  }}
                >
                  {formIntro}
                </Text>
              </div>
            </div>
          </Col>

          {/* Right side - Form */}
          <Col xs={24} lg={10}>
            <div className="h-screen flex items-center justify-center p-5 relative" style={{ backgroundColor: 'rgb(240, 248, 255)' }}>
              {/* Seamless transition from blur to soft blue background */}
              <div
                className="absolute left-0 top-0 w-16 h-full z-0"
                style={{
                  background: 'linear-gradient(to right, rgba(240, 248, 255, 0.9), rgba(240, 248, 255, 1))'
                }}
              />

              <Card
                className="w-full max-w-md border-0 rounded-2xl shadow-2xl overflow-hidden relative z-10"
                bodyStyle={{ padding: '40px', backgroundColor: 'white' }}
              >
                {/* Form Header */}
                <div className="text-center mb-9">
                  <Title
                    level={2}
                    className="text-gray-800 mb-2 text-3xl font-semibold"
                  >
                    {formTitle}
                  </Title>
                  <Text className="text-gray-600 text-base leading-relaxed">
                    {formDescription}
                  </Text>
                </div>

                {/* Form */}
                <Form
                  layout="vertical"
                  onFinish={handleSubmit(onSubmit)}
                >
                  {array &&
                    array.map((item, index) => (
                      <Form.Item
                        key={index}
                        label={
                          <Text className="text-gray-700 font-medium capitalize text-sm">
                            {item.field}
                          </Text>
                        }
                        validateStatus={errors[item.field] ? 'error' : ''}
                        className="mb-5"
                      >
                        <Controller
                          name={item.field}
                          control={control}
                          render={({ field }) => (
                            <Input
                            {...field}
                            type={item.type}
                            placeholder={`Enter ${item.field}`}
                            disabled={item.disable}
                            className={`
                              h-12 px-4 text-sm border rounded-xl transition-all duration-300 ease-in-out
                              shadow-sm hover:shadow-md focus:shadow-lg
                              placeholder:text-gray-400 placeholder:font-normal
                              ${item.disable
                                ? 'bg-gray-50/50 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-white/80 backdrop-blur-sm text-gray-700 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                              }
                              focus:ring-2 focus:ring-blue-100 focus:outline-none
                            `}
                            style={{
                              borderColor: errors[item.field] 
                                ? '#ef4444' 
                                : item.disable 
                                  ? '#e5e7eb' 
                                  : '#e5e7eb',
                              boxShadow: errors[item.field] 
                                ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                                : undefined
                            }}
                          />
                          )}
                        />
                      </Form.Item>
                    ))}

                  {/* Forgot Password Link */}
                  <div className="text-right mb-6">
                    <Link to="/forgot-password">
                      <Text className="text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors duration-200">
                        Forgot password?
                      </Text>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Form.Item className="mb-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="h-11 text-base font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {submitButtonText}
                    </Button>
                  </Form.Item>

                  {/* Divider */}
                  <Divider className="my-8 border-gray-300">
                    <Text className="text-gray-500 text-xs font-medium bg-white px-4">
                      OR
                    </Text>
                  </Divider>

                  {/* Google Login Button */}
                  <Button
                    block
                    onClick={handleMessage}
                    className="h-11 flex items-center justify-center mb-8 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transform hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Space>
                      <Avatar
                        size={20}
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="mr-1"
                      />
                      <span>Continue with Google</span>
                    </Space>
                  </Button>

                  {/* Bottom Link */}
                  <div className="text-center">
                    <Text className="text-gray-600 text-sm">
                      <Link to={redirect}>
                        <span className="text-blue-500 font-medium hover:text-blue-700 transition-colors duration-200">
                          {checkedAccount}
                        </span>
                      </Link>
                    </Text>
                  </div>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
);

export default AuthForm;