import React from 'react';
import { Context, RecipePreviewTile, OnboardingCard } from '../components';
import { styled, Grid, Image, Heading, Link, Box } from 'reakit';
import { keyframes } from 'styled-components';
import { RouterProps } from 'next/router';
import RouterLink from 'next/link';

// Props types
interface Props {
  router: RouterProps;
}

// State types
interface State {
  budget?: string;
  skill?: string;
  meal?: string;
  time?: string;
  cuisine?: string;
  restrictions?: string;
  showAdditional?: boolean;
}

class IndexPage extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    const initialState = {
      showAdditional: false,
    };
    this.state = initialState;
  }

  // needed for access to this.context
  public static contextType = Context;

  public loadPoster(): void {
    const img: any = window.document.querySelector('.poster > img');
    const newImg: any = new (window as any).Image(); // just to make typescript happy
    newImg.src = img.src;
    newImg.onload = (): void => {
      img.classList.add('poster_loaded');
    };
  }

  public async componentDidMount(): Promise<void> {
    this.loadPoster();
  }

  public render(): JSX.Element {
    return (
      <PageGrid padding={40} gap={60} showAdditional={this.state.showAdditional}>
        {/* Poster Container */}
        <Box
          absolute
          top={0}
          left={0}
          backgroundColor="var(--posterBgColor)"
          height={1080}
          width="calc(100vw - (100vw - 100%))"
          zIndex={-90}
          className="poster_box"
        >
          {/* Poster */}
          <picture className="poster">
            <source srcSet={require('../static/img/poster.jpg?webp')} type="image/webp" />
            <source srcSet={require('../static/img/poster.jpg')} type="image/jpeg" />
            <Image
              absolute
              src={require('../static/img/poster.jpg')}
              top={0}
              left={0}
              alt="poster"
              width="100%"
              height="100%"
              objectFit="stretch"
              onClick={(): void => this.props.router.push('/')}
            />
          </picture>
        </Box>
        {/* Section 1 - Logo and Login Link */}
        <Grid template={`"a b"`} gap={10} className="logo_grid">
          {/* Logo */}
          <picture className="logo" style={{ gridArea: 'a' }}>
            <source srcSet={require('../static/img/logo.png?webp')} type="image/webp" />
            <source srcSet={require('../static/img/logo.png')} type="image/jpeg" />
            <Image src={require('../static/img/logo.png')} alt="logo" width={200} />
          </picture>
          {/* Login Link */}
          <Link color="#fff" fontSize={24} fontWeight={700} cursor="pointer" gridArea="b" justifySelf="end">
            Login
          </Link>
        </Grid>
        {/* Section 2 - Card */}
        <OnboardingCard
          state={this.state}
          setState={(obj: Record<string, any>, callback?: any): void => this.setState(obj, callback)}
        />
        {/* Section 3 - Call To Action */}
        <Heading
          fontSize={54}
          fontWeight={500}
          color="#042347"
          margin={0}
          marginTop={240}
          className="cta_text optional_fader"
        >
          Check out some of our most popular recipes
        </Heading>
        {/* Section 4 - Recipe Preview Tiles */}
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" className="recipe_preview_grid">
          <RecipePreviewTile
            name="Tuscan Kale Chips"
            time="1"
            price="8"
            difficulty="easy"
            images={{
              webp: require('../static/img/kale.jpg?webp'),
              jpg: require('../static/img/kale.jpg'),
            }}
          />
          <RecipePreviewTile
            name="Spicy Pork Noodles"
            time="2"
            price="6"
            difficulty="mid"
            images={{
              webp: require('../static/img/spaghetti.jpg?webp'),
              jpg: require('../static/img/spaghetti.jpg'),
            }}
          />
          <RecipePreviewTile
            name="Meatballs &amp; Brocolli"
            time="2.5"
            price="8"
            difficulty="hard"
            images={{
              webp: require('../static/img/meatballs.jpg?webp'),
              jpg: require('../static/img/meatballs.jpg'),
            }}
          />
          <RecipePreviewTile
            name="Tuscan Kale Chips"
            time="1"
            price="8"
            difficulty="easy"
            images={{
              webp: require('../static/img/kale.jpg?webp'),
              jpg: require('../static/img/kale.jpg'),
            }}
          />
        </Grid>
        {/* Section 5 - Link to Recipes Page */}
        <RouterLink prefetch href="/recipes">
          <Link fontSize={28} marginBottom={70} cursor="pointer" justifySelf="center" color="#266ab8" fontWeight={500}>
            See More...
          </Link>
        </RouterLink>
      </PageGrid>
    );
  }
}

export default IndexPage;

// Styled Components, Media Queries, and Animations
const SlideIn = keyframes`
  from {
    transform: translate3d(0,-120vh,0);
    opacity: 0;

  }

  to {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;
const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const PopIn = keyframes`
  from {
    opacity: 0;
  }

  to {

    opacity: 1;
  }
`;
const PageGrid = styled(Grid)`
  animation: ${SlideIn} 1s ease-in-out;
  .poster > img {
    opacity: 0;
  }
  .poster_loaded {
    animation: ${FadeIn} 0.6s ease-in-out;
    opacity: 1 !important;
  }
  .expanded {
    animation: ${PopIn} 0.4s ease-in-out;
  }
  .poster_box {
    ${(props: State): string => props.showAdditional && `height: 1260px!important;`}
  }
  @media (max-width: 1024px) {
    .poster img {
      object-fit: cover !important;
    }
    .cta_text {
      font-size: 50px !important;
    }
  }
  @media (max-width: 768px) {
    .logo_grid {
      grid-template: 'b' 'a' !important;
      .logo {
        justify-self: center;
      }
    }
    .poster_box {
      height: ${(props: State): string => (props.showAdditional && `1760px`) || `1480px`} !important;
    }
  }
  @media (max-width: 425px) {
    padding: 15px !important;
    .logo_grid {
      margin: 10px !important;
    }
    .poster_box {
      height: ${(props: State): string => (props.showAdditional && `1760px`) || `1480px`} !important;
    }
    .cta_text {
      font-size: 40px !important;
      text-align: center;
    }
    .recipe_preview_grid {
      grid-template-columns: unset !important;
      h2 {
        font-size: 30px !important;
      }
    }
  }

  .logo > img {
    :hover {
      cursor: pointer;
    }
  }
`;
