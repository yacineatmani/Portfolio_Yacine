<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SkillResource\Pages;
use App\Filament\Resources\SkillResource\RelationManagers;
use App\Models\Skill;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SkillResource extends Resource
{
    protected static ?string $model = Skill::class;

    protected static ?string $navigationIcon = 'heroicon-o-cpu-chip';

    protected static ?string $navigationLabel = 'Compétences';

    protected static ?string $modelLabel = 'Compétence';

    protected static ?string $pluralModelLabel = 'Compétences';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('level')
                    ->required()
                    ->options([
                        'debutant' => 'Débutant',
                        'intermediaire' => 'Intermédiaire',
                        'avance' => 'Avancé',
                        'expert' => 'Expert',
                    ]),
                Forms\Components\TextInput::make('category')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Ex: Frontend, Backend, Base de données, etc.'),
                Forms\Components\TextInput::make('icon')
                    ->nullable()
                    ->helperText('URL de l\'icône ou nom de l\'icône'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('level')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'débutant', 'debutant', 'Débutant', 'Debutant' => 'gray',
                        'intermédiaire', 'intermediaire', 'Intermédiaire', 'Intermediaire' => 'warning',
                        'avancé', 'avance', 'Avancé', 'Avance' => 'success',
                        'expert', 'Expert' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('category')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('icon')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('level')
                    ->options([
                        'debutant' => 'Débutant',
                        'intermediaire' => 'Intermédiaire',
                        'avance' => 'Avancé',
                        'expert' => 'Expert',
                    ]),
                Tables\Filters\SelectFilter::make('category'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSkills::route('/'),
            'create' => Pages\CreateSkill::route('/create'),
            'edit' => Pages\EditSkill::route('/{record}/edit'),
        ];
    }
}
