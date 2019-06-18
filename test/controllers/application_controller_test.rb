class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test 'should get to home' do
    get root_path
    assert_response :success
  end
end
