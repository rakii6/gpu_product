
export const createOrder = async (environmentData, setPaymentData, navigate, setLoading, setPaymentLoading, setLoadingMessage )=>{

    const idToken = localStorage.getItem("idToken")
    environmentData.price = parseFloat(environmentData.price)
    const container_request ={
        user_id:environmentData.user_id,
        container_type: environmentData.container_type,
        subdomain: environmentData.subdomain, 
        gpu_count: environmentData.gpu_count,
        duration: environmentData.duration }
    const payment_request = {
        amount:environmentData.price,
        currency: environmentData.currency,
        user_id: environmentData.user_id,
        container_request: environmentData.container_type
    }


    try{

        const response = await fetch (`https://api.indiegpu.com/docker/payments/create_order`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${idToken}`
            },
            body: JSON.stringify({
                container_request,
                payment_request
            })
        })

        const data = await response.json();
        // console.log(data)
        if (data.status === "error"){
          return data.message
        }
        
        launchRazorpay(data, setPaymentData, environmentData, navigate, setLoading, setPaymentLoading, setLoadingMessage)
        
        

    }catch(err){
        // console.error("Order creation failed", err);
        throw err;
    }
}

export const launchRazorpay = (orderDetails, setPaymentData, environmentData, navigate, setPaymentLoading, setLoadingMessage) => {
  const options = {
    key: orderDetails.key_id,
    amount: orderDetails.amount , // in paise if INR
    currency: orderDetails.currency,
    name: orderDetails.name,
    description: orderDetails.description,
    order_id: orderDetails.id,
    handler: function (response) {
      // console.log("✅ Payment successful");
      setPaymentLoading(true)
      setLoadingMessage("Payment successful! Creating your environment...")
       setPaymentData(response)
      // console.log("payment data is updated to the compoenet,here is it", response)
      

      verifySignature(response, environmentData)
      .then((result)=>{
        //  console.log("Payment Verified", result)
         setLoadingMessage("Environment ready! Redirecting...")
        setTimeout(() => {
           setPaymentLoading(true)
           navigate("/environments")
         }, 2000)
      })
      .catch((err)=>{
        // console.error("failed Verification", err)
        setPaymentLoading(false)
        setLoadingMessage("")
      })
      
      // Optional: send `response` to backend to verify signature
    },
    // prefill: {
    //   email: "raktimbarua88@gmail.com",
    //   contact: "+919101788848",
    // },
    theme: {
      color: orderDetails.theme,
    },
    modal: {
      ondismiss: async function () {
        // console.log("❌ Payment cancelled");
        setPaymentLoading(true)
        setLoadingMessage("Payment cancelled. Cleaning up...")
        const order_id = orderDetails.id
        const idToken = localStorage.getItem("idToken")
        try {
            const res = await fetch (`https://api.indiegpu.com/docker/payments/clear/${order_id}`,{ 
            method: "POST",
            headers:{
                // "Content-Type":"application/json",
                Authorization:`Bearer ${idToken}`,
                'Content-Type': 'application/json'
            }
        })
        const message = await res.json()
         setPaymentLoading(false)
            setLoadingMessage("")
        return message
        }
        catch(err){
          // console.log("error from here ", err)
           setPaymentLoading(false)
          setLoadingMessage("")
          throw err
        }
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const verifySignature = async (paymentData, environmentData)=>{
  const container_request ={
        user_id:environmentData.user_id,
        container_type: environmentData.container_type,
        subdomain: environmentData.subdomain, 
        gpu_count: environmentData.gpu_count,
        duration: environmentData.duration }
  const payment_data = {
    razorpay_order_id: paymentData.razorpay_order_id,
    razorpay_payment_id: paymentData.razorpay_payment_id,
    razorpay_signature:paymentData.razorpay_signature
  }
  const idToken = localStorage.getItem('idToken')
  try {

    const response = await fetch (`https://api.indiegpu.com/docker/environment/create`, {
      method:'POST',
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${idToken}`
      },
      body:JSON.stringify({
        container_request, payment_data
      })
    })
     if(!response.ok){
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json();
    return data;

   
    
  }catch(err){
      // console.error("Order creation failed", err);
      throw err;
  }
}






// razorpay_order_id
// : 
// "order_QdThCPDkETirDu"
// razorpay_payment_id
// : 
// "pay_QdThjGpfSCR4I7"
// razorpay_signature
// : 
// "d1a97c6b06f2f819c1396a99a512c1639388b29eaf89872a3048e337da36818a"



















  export const createEnvironment = async (idToken, uid, environmentData) => {
    try {
      // Make the API call to create a new environment
      const response = await fetch(`https://api.indiegpu.com/docker/environment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(environmentData),
    })
    
    // Check if the response is successful
    if (!response.ok) {
      // Get error details from the response if available
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `API error: ${response.status}`
      } catch (e) {
        errorMessage = `API error: ${response.status}`
      }
      
      throw new Error(errorMessage)
    }
    
    // Parse and return the JSON response
    const data = await response.json()
    // console.log(data, "this is the data from the create env api")
    return data
  } catch (error) {
    // console.error("Failed to create environment:", error)
    throw error // Re-throw to let the component handle it
  }
}
