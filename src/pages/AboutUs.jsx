import React from 'react';
import styled from "styled-components";

const AboutUsContainer = styled.div`
  min-height: 100vh;
  background-color: #343332;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 80vw;
  padding: 50px 0;
`

const Title = styled.p`
  color: whitesmoke;
  font-size: 40px;
  margin: 0;
  font-weight: 500;
`

const Block = styled.div`

`

const Line = styled.div`
  width: 100px;
  border-top: whitesmoke;
  border-top-width: 4px;
  border-top-style: solid;
`

const ProfileRow = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding-bottom: 100px !important;
  justify-content: space-evenly;
  box-sizing: border-box;
`

const Card = styled.div`
  width: 280px;
  height: 410px;
  background-color: #232121;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 10px 2px rgba(124, 124, 124, 0.3);
  }

  p {
    margin: 0;
  }
`

const ImagenProfile = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
 
`

const DevName = styled.p`
  font-size: ${(props) => props.short? "22px" :"25px"};
  font-weight: 600;
  color: white;
  margin-bottom: 2px !important;
`

const CardContent = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`

const DevEng = styled.p`
  color: grey;
`

const Linkedin = styled.a`
  width: 30px;
  height: 30px;
  img{
    height: 30px;
    width: 30px;
  }
`


function AboutUs(props) {
    return (
        <AboutUsContainer>
            <Container>
                <Block>
                    <Title>
                        About us
                    </Title>
                    <Line/>
                </Block>
                <ProfileRow>
                    <Card onClick={() => window.location.href ="https://www.linkedin.com/in/fabrizio-serial/"} target="_blank">
                        <ImagenProfile src="https://media-exp1.licdn.com/dms/image/C5603AQHo6Vso5MrKIw/profile-displayphoto-shrink_800_800/0/1615217689305?e=1642636800&v=beta&t=PxKozoxu5FMNTdCDBHC7_uaIcsIZu5-K86mrgccLlYk"/>
                        <CardContent>
                            <div>
                                <DevName short>Agustin Von Stazsweski</DevName>
                                <DevEng>Estudiante de Ingenieria</DevEng>
                            </div>
                            <Linkedin>
                                <img src="https://events.lazarillo.app/images/blog/linkedin-blanco.png"/>
                            </Linkedin>
                        </CardContent>
                    </Card>
                    <Card onClick={() => window.location.href ="https://www.linkedin.com/in/fabrizio-serial/"} target="_blank">
                        <ImagenProfile src="https://media-exp1.licdn.com/dms/image/C4D03AQHIOqB3J9arvQ/profile-displayphoto-shrink_800_800/0/1608572648943?e=1642636800&v=beta&t=v9EMMpkcmudxhQhhgKDw-7ua3NWWZausWT43P-bcZJc"/>
                        <CardContent>
                            <div>
                                <DevName>Serial Fabrizio</DevName>
                                <DevEng>Estudiante de Ingenieria</DevEng>
                            </div>
                            <Linkedin>
                                <img src="https://events.lazarillo.app/images/blog/linkedin-blanco.png"/>
                            </Linkedin>
                        </CardContent>
                    </Card>
                    <Card onClick={() => window.location.href ="https://www.linkedin.com/in/fabrizio-serial/"} target="_blank">
                        <ImagenProfile src="https://media-exp1.licdn.com/dms/image/C4D03AQFOqeyT2hJMBw/profile-displayphoto-shrink_200_200/0/1623770492164?e=1641427200&v=beta&t=k9PyeJL4HY85KQrbj6DBgBwr-PyLXuLHvNCq8oZLjgY"/>
                        <CardContent>
                            <div>
                                <DevName>Mauro Kinderknecht</DevName>
                                <DevEng>Estudiante de Ingenieria</DevEng>
                            </div>
                            <Linkedin>
                                <img src="https://events.lazarillo.app/images/blog/linkedin-blanco.png"/>
                            </Linkedin>
                        </CardContent>
                    </Card>
                </ProfileRow>


            </Container>
        </AboutUsContainer>
    );
}

export default AboutUs;