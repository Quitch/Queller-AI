# Queller AI documentation

Four documents. Two are written by hand, two are generated.

| Document                                  | Answers                                                      |
| ----------------------------------------- | ------------------------------------------------------------ |
| [The AI engine](ai-engine.md)             | How PA runs an AI army, from lobby pick to target selection. |
| [Queller architecture](architecture.md)   | How this mod is built, and how to change it.                 |
| [Engine vocabulary](engine-vocabulary.md) | Every legal enum value and what it means. _Generated._       |
| [Tier inventory](tier-inventory.md)       | What is in each tier and how the tiers differ. _Generated._  |

**Start with [the AI engine](ai-engine.md)** if you have not worked on PA's AI before -
everything else assumes it. If you only want to change a build order, the two worked
examples in [architecture](architecture.md) are the shortest route in.

`CLAUDE.md` in the repo root is a different kind of document: hazards and conventions for
someone editing this repo, not an explanation of how anything works.

## Where each kind of fact lives

One home per fact, so nothing is maintained twice.

| Fact                                               | Home                   |
| -------------------------------------------------- | ---------------------- |
| What an enum value means, or whether it is legal   | `engine-vocabulary.md` |
| How the engine loads, ticks and decides            | `ai-engine.md`         |
| Why Queller's data is shaped the way it is         | `architecture.md`      |
| **Any count** of files, entries, templates or tags | `tier-inventory.md`    |
| A hazard that changes what an editor should do     | `CLAUDE.md`            |
| Player-visible behaviour                           | `README.md`            |
| What changed and when                              | `CHANGELOG.md`         |

The count rule is absolute: **a number in a hand-written document is a bug.** Prose says
"the tiers diverge" and links; the generated inventory says by how much. This is not
theoretical - `CLAUDE.md` carried a per-tier table that had silently drifted, and
`engine-vocabulary.md` recorded hundreds of uses of a `base_sort` value that a commit had
already removed entirely. Both were found while writing these documents.

## Generated documents

| File                   | Rebuild with                 | Prose lives in                            | Needs          |
| ---------------------- | ---------------------------- | ----------------------------------------- | -------------- |
| `engine-vocabulary.md` | `npm run refresh:vocabulary` | `scripts/lib/vocabulary-reference.js`     | the PA install |
| `tier-inventory.md`    | `npm run refresh:inventory`  | `scripts/lib/tier-inventory-reference.js` | the repo alone |

Do not hand-edit either one; edit the reference module and regenerate. Both write through
Prettier, so regenerating never breaks `npm run format:check`.

`npm run validate:docs` checks that `tier-inventory.md` matches the data and that every
cross-reference in these documents resolves. It cannot check `engine-vocabulary.md`,
which needs `bin_x64/server.exe`, and it says so rather than passing quietly - refresh
that one after a PA patch.

## Confidence markers

PA's AI is closed-source C++. Almost everything in [the AI engine](ai-engine.md) is
recovered rather than read from a specification, and pretending otherwise would be
dishonest. So claims carry their confidence inline.

| Marker                      | Means                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _(no marker)_               | **Verified.** Readable directly from a cited artefact - a game script, a string in `server.exe`, a JSON file, an official doc page, or observed `--ai-log` output. |
| **`Inferred (layout).`**    | Recovered from how the binary is laid out: string adjacency, symbol ordering, membership of a contiguous run.                                                      |
| **`Inferred (behaviour).`** | Recovered from what the data does and what the game then does.                                                                                                     |
| **`Open question.`**        | Named rather than omitted.                                                                                                                                         |

The absence of a marker is itself a claim: it means the statement is verified, not that
nobody checked. This mirrors the rule the vocabulary tables already follow - a blank
Notes cell means no cited source documented that value, never that the value does
nothing.

Every marked claim carries three things in the same paragraph: **the evidence, the
confidence, and the experiment that would settle it.**

Two conventions keep that from rotting:

**Adjacency, not offsets.** Byte offsets move with every PA patch; the _order_ of strings
generally does not. Claims are stated as "X sits immediately before Y", never as an
address.

**Assert the evidence in code.** `scripts/refresh-engine-vocabulary.js` carries an
`ADJACENCY` table of layout claims that produce no whitelist and exist only to be
checked. `npm run refresh:vocabulary` - already the documented post-patch ritual - fails
loudly if one stops holding, naming the documentation section that has just become
unsourced. A prose inference that a script re-checks is worth considerably more than one
that nobody will ever re-examine.

### One caveat that applies throughout

A class name in `server.exe`'s string table proves that the class exists and is spelled
that way. **It proves nothing about what it does.** `FabberManager` existing is not
evidence that fabbers are managed per base. Where this document describes what a
component owns or how components relate, that is `Inferred (behaviour)` unless a cited
source says otherwise.
