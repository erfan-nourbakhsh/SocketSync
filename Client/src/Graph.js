// Import React library
import React from 'react';

// Import the main Particles component from react-tsparticles
import Particles from "react-tsparticles";

// Import the Engine type from tsparticles for TypeScript type checking
import type { Engine } from "tsparticles-engine";

// Import the "links" preset loader from tsparticles
import { loadLinksPreset } from "tsparticles-preset-links";

// Define a class-based React component that extends PureComponent
// PureComponent automatically implements a shallow prop/state comparison for performance
export class ParticlesContainer extends React.PureComponent<IProps> {

  // Custom initialization function for tsParticles engine
  // This function runs before particles are rendered
  async customInit(engine: Engine): Promise<void> {
    // Load the "links" preset into the tsParticles engine
    // This preset creates particles connected by lines (links)
    await loadLinksPreset(engine);
  }

  // Render method returns the JSX UI
  render() {
    // Define options for the particles
    const options = {
      preset: "links", // Use the "links" preset for particle behavior
    };

    // Render the Particles component
    // - options: defines particle appearance and behavior
    // - init: called before rendering to allow engine customization
    return <Particles options={options} init={this.customInit} />;
  }
}
