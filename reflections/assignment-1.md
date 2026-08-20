# Reflection

## Project Introduction

This is an interactive explainer of how energy moves through a food chain — something people rarely have a clear mental model of. The core idea: moving up the chain, animals get bigger while the energy available to them gets smaller. I built this as a simplified marine food chain, from the Sun and phytoplankton through zooplankton, krill, small fish, mackerel, squid, tuna, seal, great white shark, and orca, with scrolling as the interaction: as the visitor scrolls, the page moves through the chain and an energy indicator gradually decreases. The interaction is the explanation — the visitor watches the energy shrink rather than just reading that it does. I deliberately scoped this to one question: where does the energy go as we move up the food chain?

## What was the breakthrough that moved the work forward?

The biggest challenge was deciding the chain's length. I initially wanted around 20 organisms for more interaction, but discussing it with AI and looking into real predator-prey relationships, I realised a long, perfectly linear chain misrepresents how ecosystems work — food webs are interconnected, and most predators have multiple prey. I considered fudging it with unrelated animals at increasing size, but that felt scientifically misleading. The breakthrough was giving up on maximising organism count and instead choosing a chain that was credible and long enough to carry the interaction: a simplified marine chain built around one idea — only a fraction of energy transfers to the next trophic level. Reducing scope made the explanation stronger, because every element had a clear purpose.

## What did this work change about who I want to be as a software developer?

The most time-consuming part was the organism illustrations — sometimes ten-plus rounds of back-and-forth with AI on a single image. I learned "try again" isn't enough when AI is stuck in a loop; a visual reference plus precise, measurable instructions worked far better — "1.5 times larger and moved 20 pixels lower" landed where "the tail looks wrong" didn't. That changed how I want to work as a product manager: translating a vision into requirements, constraints, examples, and actionable feedback that designers, developers, stakeholders, or AI tools can act on. A clear mental model isn't enough if I can't make it usable by whoever's implementing it — effective communication is what turns a vision into something real.
