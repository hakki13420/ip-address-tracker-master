import { styled } from 'styled-components'
import bg from '../assets/images/pattern-bg-desktop.png'
import { useState } from 'react'
import device from '../devices'

const Header = ({ ipPublic, setPublicIp, setDomain, ip, location, timeZone, isp }) => {
  const [error, setError] = useState(true)
  const [placeHolder, setPlaceHolder] = useState('Search for any IP adress or domain')

  const submitForm = (event) => {
    event.preventDefault()
    console.log('input    ======================', event.target.ip.value)
    if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g.test(event.target.ip.value) &&
    !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g.test(event.target.ip.value)) {
      setPlaceHolder('ip or domain name not valid try again!!')
      setError(true)
    } else if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g.test(event.target.ip.value)) {
      setPublicIp(event.target.ip.value)
    } else if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g.test(event.target.ip.value)) {
      setDomain(event.target.ip.value)
    }
  }

  setTimeout(() => {
    setPlaceHolder('Search for any IP adress or domain')
    setError(false)
  }, 4000)

  const Header = styled.div`    
    height:200px;
    width:100%;
    background-image:url(${bg});
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:1rem;
    position:relative;    
    @media only screen and ${device.xs}{
      height:350px
    }
    @media only screen and ${device.sm}{
      height:200px
    }
  `
  const Title = styled.h1`
    color:white;
    font-weight:500;
    margin-bottom:2rem;
  `

  const Form = styled.form`
    display:flex;

    input{
      border-radius:5px 0 0 5px;
      background:white;
      padding:7px 20px;
      height:3rem;
      width:18rem;
      border:${props => props.error ? '1px solid red' : 'none'};
    }
    button{
      background:black;
      border:none;
      padding:7px 15px;
      border-radius:0 5px 5px 0;
      color:white;
    }
  `
  const SearchResult = styled.div`
    position:absolute;
    width:80%;
    height:7rem;
    background:white;
    border-radius:10px;
    left:50%;
    transform: translateX(-50%);
    padding:25px 0;
    display:flex;
    justify-content:space-between;
    z-index:2;
    @media only screen and ${device.xs}{
      flex-direction: column;
      height:auto;
      top:45%;
      bottom:unset;
    }
    @media only screen and ${device.sm}{
      flex-direction: row;            
      top:75%;

    }

    .box-info{
      width:25%;
      border-right:1px solid gray;
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:5px;
      padding:20px;
      @media only screen and ${device.xs}{
       border-right:none;
       width:100%;
       align-items:center;
      }
      h3{
        color:var(--DarkGray);
        font-weight:400;
        text-transform:uppercase;
        font-size:0.95rem;
      }
      h1{
        color:var(--VeryDarkGray);
        font-size:1.4rem;
      }
    }
    .box-info:last-child{
      border-right:none;
    }
  `

  return (
    <>
    <Header>
        <Title>IP Adress Tracker</Title>
        <Form onSubmit={submitForm} error={error}>
          <input type="text" name='ip' placeholder={placeHolder} />
          <button type='submit'>&gt;</button>
        </Form>
      <SearchResult>
        <div className="box-info">
          <h3>IP adress</h3>
          <h1>{ip}</h1>
        </div>
        <div className="box-info">
          <h3>location</h3>
          <h1>{location}</h1>
        </div>
        <div className="box-info">
          <h3>Timezone</h3>
          <h1>{timeZone}</h1>
        </div>
        <div className="box-info">
          <h3>Isp</h3>
          <h1>{isp}</h1>
        </div>
      </SearchResult>
      </Header>
    </>
  )
}

export default Header
